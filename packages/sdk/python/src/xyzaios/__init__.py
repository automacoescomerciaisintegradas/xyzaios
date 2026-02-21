# Initialization exposing core clients and exceptions globally
from .client import XYZAIOSClient
from .exceptions import (
    XYZAIOSException,
    AuthenticationError,
    NetworkError,
    ValidationError,
    WorkerAPIError,
)

__version__ = "1.0.0"
__all__ = [
    "XYZAIOSClient",
    "XYZAIOSException",
    "AuthenticationError",
    "NetworkError",
    "ValidationError",
    "WorkerAPIError",
]
