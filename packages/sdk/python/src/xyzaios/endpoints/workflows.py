# AIDEV-NOTE: Endpoint mapping the Lobster Engine / Execution worker logic
from typing import Dict, Any, Optional
from ..client import XYZAIOSClient
from ..models import WorkflowExecutionStatus
from .base import BaseEndpoint

class WorkflowsEndpoint(BaseEndpoint):
    """
    Submodule to trigger and monitor Antigravity Workflows via Worker payload
    """
    async def trigger(self, workflow_name: str, parameters: Optional[Dict[str, Any]] = None) -> WorkflowExecutionStatus:
        """
        Dispara um arquivo `.lobster` (workflow) na engine.
        
        Args:
            workflow_name (str): nome do arquivo de automação, ex: 'antigravity_bun_typecheck'
            parameters (dict): Variáveis injetáveis à máquina para bypassar as env padrão
            
        Returns:
            WorkflowExecutionStatus: Objeto rigoroso do pydantic com estatísticas da execução.
        """
        payload = {"workflow": workflow_name}
        if parameters:
            payload["parameters"] = parameters
            
        # POST requests directly returning wrapped Pydantic models
        raw_response = await self._client.post("/api/v1/workflows/trigger", json_data=payload)
        return self._parse_response(raw_response, WorkflowExecutionStatus)

    async def get_status(self, execution_id: str) -> WorkflowExecutionStatus:
        """
        Consulta o histórico ou snapshot atual (pooling passivo) de uma execução específica.
        """
        raw_response = await self._client.get(f"/api/v1/workflows/status/{execution_id}")
        return self._parse_response(raw_response, WorkflowExecutionStatus)
