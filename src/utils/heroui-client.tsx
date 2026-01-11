// src/lib/heroui-client.tsx
'use client'; // 🔥 这一行给所有组件“开光”，加上客户端属性

// 🌟 直接导出所有组件，以后加新组件不用改这里
export * from '@heroui/react';

// 🌟 顺便把 Link 也在这里处理了（可选，防止 import 混乱）
// export { Link } from "@/i18n/navigation";
