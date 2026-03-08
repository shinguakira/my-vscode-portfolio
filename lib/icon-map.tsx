import {
  BookOpen,
  Braces,
  Code2,
  FileText,
  Folder,
  HelpCircle,
  ImageIcon,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Palette,
  Settings,
  ShoppingCart,
  Sparkles,
  Zap,
} from "lucide-react"
import React from "react"

const iconComponents: Record<
  string,
  React.FC<{ className?: string; style?: React.CSSProperties }>
> = {
  "shopping-cart": ShoppingCart,
  "message-circle": MessageCircle,
  "layout-dashboard": LayoutDashboard,
  palette: Palette,
  sparkles: Sparkles,
  image: ImageIcon,
  "file-text": FileText,
  folder: Folder,
  zap: Zap,
  "help-circle": HelpCircle,
  braces: Braces,
  "book-open": BookOpen,
  mail: Mail,
  settings: Settings,
}

export function IconFromKey({
  iconKey,
  className = "w-5 h-5",
  style,
}: {
  iconKey: string
  className?: string
  style?: React.CSSProperties
}) {
  const Icon = iconComponents[iconKey] || Code2
  return <Icon className={className} style={style} />
}
