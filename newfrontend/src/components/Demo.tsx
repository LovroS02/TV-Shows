import { Avatar, AvatarGroup } from "@chakra-ui/react"

export default function Demo() {
    return (
        <AvatarGroup>
            <Avatar.Root>
            <Avatar.Fallback name="Matej Galic"/>
            <Avatar.Image src="https://bit.ly/sage-adebayo"/>
            </Avatar.Root>
        </AvatarGroup>
    )
}