# README

This package exposes a single function: `setEOLStyleFromOS`.
It – asynchronously – sets the EOL style to match the current style dictated by the OS you’re running on — typically, `\r\n` for Windows and `\n` for POSIX-compliant (AKA “reasonable”) OS’es.
It’s a separate package to avoid any problems with web bundlers, which can insist on wanting to bundle Node.js-specific packages such as the `os` module, and then complain it should be poly-filled.

Usage:

```typescript
import {setEOLStyleFromOS} from "littoral-templates-node"

await setEOLStyleFromOS()
```

