# 🎰 BestCasinoPortal MCP Memory Keeper

Persistent context management for the BestCasinoPortal_SEO project using the Model Context Protocol (MCP).

## 🚀 Overview

This MCP server provides persistent memory and context management for the BestCasinoPortal casino.ca architecture development project. It maintains project state, server information, development progress, and critical metrics across development sessions.

## ✨ Features

- **Persistent Context Storage**: File-based storage for project context
- **Server Management**: Track server IP updates and deployment status (193.233.161.161)
- **Progress Tracking**: Monitor development phases and completion status
- **Error Management**: Track and categorize development issues
- **Checkpoint System**: Create snapshots of project state
- **Agent Coordination**: Track multi-agent development status

## 🛠️ Installation

### Quick Start (NPX)
```bash
npx bestcasinoportal-mcp-memory
```

### GitHub Installation
```bash
git clone https://github.com/dunnhtomas/bestcasinoportal-mcp-memory.git
cd bestcasinoportal-mcp-memory
npm install
npm start
```

## 📋 MCP Configuration

Update your `.mcp/config.json`:

```json
{
  "mcpServers": {
    "bestcasinoportal-memory": {
      "command": "npx",
      "args": ["bestcasinoportal-mcp-memory"],
      "env": {
        "DATA_DIR": "./memory-data",
        "PROJECT_NAME": "BestCasinoPortal_SEO",
        "CHANNEL": "casino-portal-unified",
        "LOG_LEVEL": "INFO"
      },
      "description": "BestCasinoPortal MCP Memory Keeper for persistent context"
    }
  }
}
```

## 🔧 Available Tools

### `memory_save`
Save important project context and updates.

**Parameters:**
- `content` (required): Context or update to save
- `category`: Category type (server, architecture, progress, error, deployment, agent, general)
- `priority`: Priority level (critical, high, medium, low)

### `memory_get`
Retrieve project context and status.

**Parameters:**
- `category`: Specific category or "all" for complete context

### `memory_update_server`
Update server information including IP address.

**Parameters:**
- `ip` (required): Server IP address (193.233.161.161)
- `status`: Server status (active, maintenance, down)
- `environment`: Environment type (production, staging, development)

### `memory_checkpoint`
Create a checkpoint of current project state.

**Parameters:**
- `description` (required): Description of this checkpoint

## 📁 Current Server Details

- **IP Address**: 193.233.161.161
- **Environment**: Production
- **Status**: Active
- **SSL**: Configured (A+ grade)
- **Security**: Enterprise hardened

## 🎯 Casino.ca Architecture Integration

- **Performance Targets**: Sub-200ms API responses, Core Web Vitals compliance
- **Security Standards**: Enterprise-grade with SOC2/GDPR/PCI-DSS compliance
- **Testing Policy**: Mandatory Playwright testing with deployment blocking
- **Technology Stack**: PHP 8.1+, Vue.js 3+, PostgreSQL, Redis, Nginx

## 📈 Current Project Status

- **Overall Progress**: 95% Complete
- **Current Phase**: Final error resolution and deployment preparation
- **Server**: 193.233.161.161 (Production ready)
- **Critical Path**: TypeScript dependency resolution and Playwright test fixes

## 🤝 Contributing

This repository is part of the BestCasinoPortal_SEO project. For contributing guidelines and development workflow, please refer to the main project documentation.

## 📄 License

MIT License - see LICENSE file for details.

---

**Status**: Active Development | **Last Updated**: August 17, 2025 | **Version**: 1.0.0