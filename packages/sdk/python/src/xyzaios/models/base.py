# AIDEV-NOTE: Base generic models for API responses
# AIDEV-PERF: Using Pydantic V2 syntax for faster serialization

from pydantic import BaseModel, ConfigDict, Field
from typing import Generic, TypeVar, Optional, Any, Dict
from datetime import datetime

T = TypeVar('T')

class XYZAIOSBaseModel(BaseModel):
    """
    Base configuration block for all SDK Pydantic models.
    Enforces strict typing and allows aliasing from remote APIs.
    """
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        extra='ignore' # Prevents crashes if worker returns new fields
    )

class BaseAPIResponse(XYZAIOSBaseModel, Generic[T]):
    """
    Expected generic envelop format for all xyzaios.automacoescomerciais-62e.workers.dev endpoints
    """
    success: bool = Field(..., description="Indicates if the operation was successful")
    data: Optional[T] = Field(default=None, description="Actual payload from the worker")
    error: Optional[str] = Field(default=None, description="Error message if success is false")
    meta: Optional[Dict[str, Any]] = Field(default=None, description="Pagination or execution metadata")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Server response time")
