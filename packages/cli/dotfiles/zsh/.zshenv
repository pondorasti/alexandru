export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:$PATH"

# bun global packages (`bun link`, `bun add -g`); bun itself comes from Vite+
export BUN_INSTALL="$HOME/.bun"
case ":$PATH:" in *":$BUN_INSTALL/bin:"*) ;; *) export PATH="$PATH:$BUN_INSTALL/bin" ;; esac

# Vite+ bin (https://viteplus.dev)
if [ -f "$HOME/.config/vite-plus/env" ]; then . "$HOME/.config/vite-plus/env"; fi
