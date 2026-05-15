function ProgressBar({progress}) {
    return (
        <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
            <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

export default ProgressBar