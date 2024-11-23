import { signIn } from "@/auth";

export default function SignIn({
  provider,
}: {
  provider?: "google" | "facebook" | "email";
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin</button>
    </form>
  );
}
