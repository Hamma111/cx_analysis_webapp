from cx_analysis.currencies.models import CurrencyMonthlyValue
from cx_analysis.currencies.utils import get_scraped_dataframe

from datetime import datetime, timedelta

start = datetime(2023, 1, 1)
end = datetime(2023, 1, 14)
datetime_generated = [start + timedelta(days=x) for x in range(0, (end - start).days)]

for _datetime in datetime_generated:
    _date = _datetime.date()
    df = get_scraped_dataframe(_date.isoformat())
    print(CurrencyMonthlyValue.get_or_create_data(df.iterrows()))

