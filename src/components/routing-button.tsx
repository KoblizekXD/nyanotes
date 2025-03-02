"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const RoutingButton = ({
  href,
  ...props
}: React.ComponentProps<typeof Button> & { href: string }) => {
  const router = useRouter();

  return <Button onClick={() => router.push(href)} {...props} />;
};

export default RoutingButton;
