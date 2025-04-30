import {
    Html,
    Button,
    Tailwind,
    Body,
    Head,
    Preview,
} from "@react-email/components"

export default function VerifyEmail({
    username,
    url,
}: {
    username: string
    url: string
}) {
    return (
        <Html
            lang="en"
            dir="ltr"
        >
            <Preview>Verify email</Preview>
            <Tailwind>
                <Head />
                <Body>
                    <p>Hi {username} welcome to our chat-app!</p>
                    <p>Click the button to verify your email</p>
                    <div className="flex justify-center mt-5">
                        <Button
                            href={url}
                            className="cursor-pointer bg-gray-300 rounded-md px-3 py-1"
                        >
                            Verify
                        </Button>
                    </div>
                </Body>
            </Tailwind>
        </Html>
    )
}
