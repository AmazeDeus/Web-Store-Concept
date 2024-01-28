type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthLinksProps {
  status: SessionStatus;
  userName: string | null;
}
