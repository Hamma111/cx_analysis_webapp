import {useState, useEffect} from "react";
import {Chart} from "../../components/Chart.jsx";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Multiselect from 'multiselect-react-dropdown';
import {
    formatDate, getCurrentYearFirsDayDate, getDateFirstDayCurrentMonth,
    getDateLastMonthFirstDay, getDateLastMonthLastDate,
    getDateLastNDays, getLastYearFirsDayDate, getLastYearLastDayDate,
} from "../../utils/utils.jsx";
import {apiCaller} from "../../api/index.jsx";


function HistoricalCurrency() {
    const [data, setData] = useState(null);
    const [currenciesListData, setCurrenciesListData] = useState()
    const [dateRange, setDateRange] = useState([getDateLastNDays(30, false), new Date()]);
    const [selectedCurrencies, setSelectedCurrencies] = useState()


    useEffect(() => {
        apiCaller({
            url: "http://127.0.0.1:8000/api/currencies/",
        }).then(response => {
            setCurrenciesListData(response.data.map(
                (item) => {
                    return {name: item.displayName, id: item.id,}
                }
            ));
        });
    }, []);

    useEffect(() => {
        apiCaller({
            url: `http://localhost:8000/api/currencies/monthly-values/?date__gte=${getDateLastNDays(30)}&date__lte=&date=&currency=34`,
        }).then(response => {
            setData(response.data);
        });
    }, []);


    const updateChartData = () => {
        apiCaller({
            url: `http://localhost:8000/api/currencies/monthly-values/?date__gte=${formatDate(dateRange[0])}&date__lte=${formatDate(dateRange[1])}&date=&currency=${selectedCurrencies}`,
        }).then(response => {
            setData(response.data);
        });
    }

    const selectSelectedCurrency = (selectedList, selectedItem) => {
        setSelectedCurrencies(selectedList.map((item) => (item.id)).join(","))
    }

    return (
        <div>
            <button onClick={() => setDateRange([getDateLastNDays(7, false), dateRange[1]])}>
                Last 7 days
            </button>

            <button onClick={() => setDateRange([getDateLastNDays(30, false), dateRange[1]])}>
                Last 30 days
            </button>

            <button onClick={() => setDateRange([getDateLastNDays(90, false), dateRange[1]])}>
                Last 90 days
            </button>

            <button onClick={() => setDateRange([getDateFirstDayCurrentMonth(false), new Date()])}>
                This Month
            </button>

            <button onClick={() => setDateRange([getDateLastMonthFirstDay(false), getDateLastMonthLastDate(false)])}>
                Last Month
            </button>

            <button onClick={() => setDateRange([getCurrentYearFirsDayDate(false), new Date()])}>
                This Year
            </button>

            <button onClick={() => setDateRange([getLastYearFirsDayDate(false), getLastYearLastDayDate(false)])}>
                Last Year
            </button>

            <button onClick={() => setDateRange([new Date(2012, 1, 1), new Date()])}>
                All time
            </button>

            <br></br>

            <Multiselect
                options={currenciesListData}
                displayValue="name" // Property name to display in the dropdown options
                onSelect={selectSelectedCurrency}
                placeholder={"Select Currency(s)"}

            />

            <DateRangePicker onChange={setDateRange} value={dateRange} format={"y-MM-dd"} maxDate={new Date()}/>

            <br></br>
            <button onClick={updateChartData}>Find</button>

            <Chart
                labels={data?.map((item) => item.date)}
                data={data?.map((item) => item.usd1)}
            />
        </div>
    );
}

export default HistoricalCurrency;