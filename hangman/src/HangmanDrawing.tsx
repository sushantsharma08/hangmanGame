const HEAD = (
    <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        border: "10px solid black",
        position: "absolute",
        top: "50px",
        right: "-30px"
    }} />
)
const BODY = (
    <div style={{
        width: "10px",
        height: "100px",
        background: "black",
        position: "absolute",
        top: "120px",
        right: "0px"
    }} />
)
const RIGHT_ARM = (
    <div style={{
        width: "90px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "0px",
        rotate: "-30deg"
    }} />
)
const LEFT_ARM = (
    <div style={{
        width: "90px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "150px",
        right: "-80px",
        rotate: "30deg"
    }} />
)
const RIGHT_LEG = (
    <div style={{
        width: "90px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "245px",
        right: "-12px",
        rotate: "-55deg"
    }} />
)
const LEFT_LEG = (
    <div style={{
        width: "90px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "245px",
        right: "-68px",
        rotate: "55deg"
    }} />
)

const BODY_PARTS = [HEAD,BODY,RIGHT_ARM,LEFT_ARM,RIGHT_LEG,LEFT_LEG]

type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div style={{ position: "relative" }}>
            {BODY_PARTS.slice(0,numberOfGuesses)}
            <div style={{ height: "50px", width: "10px", background: "black", marginLeft: "120px", position: "absolute", right: "0px" }} />
            <div style={{ height: "10px", width: "200px", background: "black", marginLeft: "120px" }} />
            <div style={{ height: "400px", width: "10px", background: "black", marginLeft: "120px" }} />
            <div style={{ height: "10px", width: "250px", background: "black" }} />
        </div>
    )
}