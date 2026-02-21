# AIDEV-NOTE: Base Handler ensuring strict HTTP propagation and unified responses

from typing import TypeVar, Type, Any, Dict
from pydantic import ValidationError as PydanticValidationError
from ..client import XYZAIOSClient
from ..exceptions import ValidationError

T = TypeVar("T")

class BaseEndpoint:
    """
    Subclass managing direct HTTP flows through the provided client instance.
    All endpoint implementations inherit from this.
    """
    def __init__(self, client: XYZAIOSClient):
        self._client = client

    def _parse_response(self, response_data: Dict[str, Any], model: Type[T]) -> T:
        """
        Parses remote generic responses forcing alignment with Pydantic Models.
        """
        try:
            # We strictly assume the top-level format reflects `BaseAPIResponse`
            # which wraps the actual `data` payload
            if "data" in response_data:
                return model(**response_data["data"])
            return model(**response_data)
        except PydanticValidationError as e:
            # Shielding inner pydantic rules via semantic errors
            raise ValidationError(f"Falha ao validar resposta do endpoint: {str(e)}")
