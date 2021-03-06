import React, { Suspense } from 'react';
import { useNewsList } from '../../Hooks/useNewsList';
import HeroBig from './heroBig';
import Title from './titleGrid';
const HeroGrid = React.lazy(() => import('./heroGrid'));


export default function NewsFirstRow() {
	const { newsList, isLoading, isError } = useNewsList();
	return (
		<>
			<HeroBig />
			<div className="grid grid-rows-3 gap-4 md:col-span-4">
				{
					isLoading || isError
						?
						<>
							<LoadingGrid />
							<LoadingGrid />
							<LoadingGrid />
						</>
						:
						newsList.slice(1, 4)?.map((index) => {
							return <Suspense key={index['_id']['$oid']} fallback={<LoadingGrid />}><HeroGrid to={index['_id']['$oid']} key={index['_id']['$oid']} title={index['title']} image={index['image']} /></Suspense>;
						})
				}


			</div>


		</>
	);
}

function LoadingGrid() {
	return (
		<div className="rounded-xl h-36 w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
			<div className="flex w-full h-full align-bottom flex-col justify-end p-4">
				<Title title={'Loading...'} />
			</div>
		</div>
	);
}
