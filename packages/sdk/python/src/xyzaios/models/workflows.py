# AIDEV-NOTE: Workflows models mirroring Antigravity Lobster executions
from typing import List, Dict, Any, Optional
from datetime import datetime
from pydantic import Field
from .base import XYZAIOSBaseModel

class StepExecution(XYZAIOSBaseModel):
    """Execution step inside a workflow run."""
    step_id: str = Field(..., description="Action identifier, e.g., 'check_expected_version'")
    status: str = Field(..., description="Step outcome (success, error, skipped)")
    output: str = Field(default="")
    duration_ms: int = Field(default=0)

class WorkflowExecutionStatus(XYZAIOSBaseModel):
    """
    Status metrics for an execution on the Antigravity Lobster engine.
    Example: antigravity_bun_typecheck
    """
    workflow_id: str = Field(..., alias="workflow_name")
    status: str = Field(..., description="Workflow overall status (running, success, failed)")
    started_at: datetime
    completed_at: Optional[datetime] = None
    steps_results: List[StepExecution] = Field(default_factory=list, description="Array of execution logs")
    outputs: Dict[str, Any] = Field(default_factory=dict, description="Variables exported by steps")
