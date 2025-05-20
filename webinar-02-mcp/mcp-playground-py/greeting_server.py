#!/usr/bin/env python3
"""
A simple MCP server that provides a greeting tool.
"""
from mcp import FastMCP

# Create a FastMCP server instance
mcp = FastMCP("Greeting Server")

@mcp.tool()
def greet(name: str) -> str:
    """Greet a person by name and tell them if they're awesome based on their name.
    
    Args:
        name: The name of the person to greet
        
    Returns:
        A greeting message that tells the person if they're awesome
    """
    return f"Hello, {name}! You are {'awesome' if name.startswith('A') else 'not awesome'}"

if __name__ == "__main__":
    # Start the server (uses stdio transport by default)
    mcp.run()
