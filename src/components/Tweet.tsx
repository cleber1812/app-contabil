type TweetProps = {
    text: string,
    //text?: string
}

export function Tweet(props: TweetProps) {
    return (
        //<p>Tweet</p>
        <p>{props.text}</p>
    );
}