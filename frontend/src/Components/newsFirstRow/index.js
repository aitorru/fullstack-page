import HeroBig from "./heroBig";
import HeroGrid from "./heroGrid";

export default function NewsFirstRow() {
    return (
        <>
            <HeroBig />
            <div className="grid grid-rows-3 gap-4 md:col-span-2">
                <HeroGrid index={1} />
                <HeroGrid index={2} />
                <HeroGrid index={3} />

            </div>


        </>
    )
}