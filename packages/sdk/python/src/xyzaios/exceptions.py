# AIDEV-NOTE: Base Exceptions for the XYZAIOS SDK
# Standardized error hierarchy for remote worker operations

class XYZAIOSException(Exception):
    """Base exception for all XYZAIOS SDK errors."""
    pass

class AuthenticationError(XYZAIOSException):
    """Raised when authentication with the worker fails 
    (e.g., Invalid or missing token)."""
    pass

class NetworkError(XYZAIOSException):
    """Raised when the device cannot reach the xyzaios.automacoescomerciais-62e.workers.dev endpoint."""
    pass

class ValidationError(XYZAIOSException):
    """Raised when input validation on resources (pydantic side) fails."""
    pass

class WorkerAPIError(XYZAIOSException):
    """Raised when the worker responds with a valid HTTP error code (e.g., 400, 500)."""
    def __init__(self, message: str, status_code: int = None, response_body: str = None):
        super().__init__(message)
        self.status_code = status_code
        self.response_body = response_body
