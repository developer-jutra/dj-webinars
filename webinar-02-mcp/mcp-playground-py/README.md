# Greeting MCP Server

A simple Model Context Protocol (MCP) server implementation that provides a greeting tool using stdio transport.

---

## Features

- **Single-file implementation** (`greeting_server.py`)
- **One tool:** `greet(name: str)` - returns a personalized greeting and tells if the name is "awesome"
- **Works with any MCP-compatible client** (e.g., Claude Desktop, MCP Inspector)
- **Development and CLI support** via optional dependencies

---

## Installation

### 1. Clone the repository and enter the directory

```
git clone 
cd greeting-mcp-server
```

### 2. Set up a virtual environment (recommended)

```
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
```

### 3. Install in editable (development) mode with all required dependencies

```
pip install -e ".[dev]"
```

This will:
- Install your project in "editable" mode (changes to code take effect immediately)
- Install the `mcp` library and its CLI dependencies (such as `typer`)

---

## Usage

### Run directly as a script

```
python greeting_server.py
```

### Run using MCP CLI (for development/testing)

```
mcp dev greeting_server.py
```

#### Test with MCP Inspector

You can use the MCP Inspector to interact with your server:

```
mcp inspector
```

### Run as an installed command-line script

```
greeting-server
```
