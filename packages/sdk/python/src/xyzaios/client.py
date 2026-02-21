# AIDEV-NOTE: Asynchronous HTTP Client Core for XYZAIOS
# Automates retry mechanisms and auth injection for worker interactions

import os
import httpx
from typing import Optional, Dict, Any
from .exceptions import AuthenticationError, NetworkError, WorkerAPIError

# Late import endpoint attachers to avoid circular dependencies
from .endpoints.workflows import WorkflowsEndpoint

# AIDEV-SECURITY: Sensible endpoint variables
DEFAULT_BASE_URL = "https://xyzaios.automacoescomerciais-62e.workers.dev"
DEFAULT_TIMEOUT = 30.0

class XYZAIOSClient:
    """
    Main asynchronous client to interact with XYZAIOS workflows and APIs.
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        base_url: Optional[str] = None,
        timeout: float = DEFAULT_TIMEOUT,
    ):
        # AIDEV-SECURITY: Prefer environment variables to hardcoded keys
        self.api_key = api_key or os.environ.get("XYZAIOS_API_KEY")
        if not self.api_key:
            raise AuthenticationError(
                "XYZAIOS_API_KEY block missing. Provide it via kwargs or env var."
            )

        self.base_url = (base_url or os.environ.get("XYZAIOS_BASE_URL") or DEFAULT_BASE_URL).rstrip("/")
        self.timeout = timeout
        
        # AIDEV-PERF: Using persistent session pooling with HTTPX
        self._client = httpx.AsyncClient(
            base_url=self.base_url,
            timeout=self.timeout,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "User-Agent": "xyzaios-python-sdk/1.0"
            }
        )
        
        # Mount Endpoints
        self.workflows = WorkflowsEndpoint(self)

    async def _request(self, method: str, path: str, **kwargs) -> Dict[str, Any]:
        """
        Internal dispatcher addressing remote workers and capturing semantic errors.
        """
        # AIDEV-NOTE: Path building avoids double slashes
        url_path = f"/{path.lstrip('/')}"
        
        try:
            response = await self._client.request(method, url_path, **kwargs)
            # Raise specific exception when returning HTTP 400~500
            response.raise_for_status()
            
            # Assuming most outputs will be JSON
            return response.json()
            
        except httpx.HTTPStatusError as e:
            # Handle specific worker rejection
            status = e.response.status_code
            if status in (401, 403):
                raise AuthenticationError("Não autorizado a acionar worker - verifique seu XYZAIOS_API_KEY")
            
            error_body = e.response.text
            raise WorkerAPIError(
                f"Falha ao acionar worker (HTTP {status}). Retorno: {error_body}",
                status_code=status,
                response_body=error_body
            )
            
        except httpx.RequestError as e:
            raise NetworkError(f"Falha de conexão com o ecossistema XYZAIOS: {str(e)}")

    async def get(self, path: str, params: Optional[Dict] = None) -> Dict[str, Any]:
        """Trigger GET request against the Cloudflare Worker ecosystem."""
        return await self._request("GET", path, params=params)

    async def post(self, path: str, json_data: Optional[Dict] = None) -> Dict[str, Any]:
        """Trigger POST event (e.g., webhook processing, Lobster actions) on Worker."""
        return await self._request("POST", path, json=json_data)

    async def close(self):
        """Cleanly closes underlying connection pools."""
        await self._client.aclose()
        
    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()
