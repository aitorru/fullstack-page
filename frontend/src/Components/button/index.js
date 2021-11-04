export default function MainButton({ text, className }) {
    return (
        <button className={`rounded-lg bg-blue-500 text-white py-2 shadow-md transition-all ${className}`}>{text}</button>
    )
}