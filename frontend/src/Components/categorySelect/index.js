
import { useCategories } from '../../Hooks/useCategories';

export default function CategorySelect({ categoriesSelected, setSelectedCategories }) {
	const { categories, isLoading, isError } = useCategories();
	return (
		<div className="md:container md:mx-auto w-full">
			<div className="grid grid-flow-col gap-4 overflow-x-scroll items-center px-3 md:px-0">
				{
					isLoading || isError
						?
						<></>
						:
						categories.map(
							category => {
								if (categoriesSelected.find(ct => ct === category)) {
									return <h3 className="text-base text-center select-none bg-gray-200 border-2 border-indigo-500 rounded-full p-3"
										key={category['_id']['$oid']}
										onClick={() => { setSelectedCategories(categoriesSelected.filter(item => item !== category)); }}
									>{category['category']}</h3>;

								} else {
									return <h3 className="text-base text-center select-none bg-gray-200 border-2 border-blue-300 rounded-full p-3"
										key={category['_id']['$oid']}
										onClick={() => { setSelectedCategories([...categoriesSelected, category]); }}
									>{category['category']}</h3>;

								}
							}
						)
				}
			</div>
		</div>
	);
}