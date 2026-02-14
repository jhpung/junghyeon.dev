import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Badge variant="secondary" className="font-mono" asChild>
      <Link href={`/tags/${tag}`}>#{tag}</Link>
    </Badge>
  );
}
