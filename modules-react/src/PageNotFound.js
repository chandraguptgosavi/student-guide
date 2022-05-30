export default function PageNotFound() {
    return (
      <div className="h-full w-full " style={{ color: "#888" }}>
            <p
                className="text-5xl font-semibold text-center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          Error 404- Page Not Found!
        </p>
      </div>
    );
}