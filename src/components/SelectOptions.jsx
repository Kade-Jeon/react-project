import "./SelectOptions.css";

const SelectOptions = ({optionsData, handleChangeOrder}) => {
    const onChangeOrder = (event) =>{
        handleChangeOrder(event.target.value);
    }

    return (
    <div className="SelectOptions" onChange={onChangeOrder}>
        <form className="max-w-sm mx-auto">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                {optionsData.map((option) => (<option key={option.id} value={option.value}>{option.display}</option>))}
            </select>
        </form>
    </div>
    )
}

export default SelectOptions;