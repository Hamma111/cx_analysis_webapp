
from datetime import date


from cx_analysis.celery import app
from cx_analysis.currencies.models import Currency, CurrencyMonthlyValue
from cx_analysis.currencies.utils import get_scraped_dataframe


@app.task
def refresh_currency_values():
    df = get_scraped_dataframe(date.today().isoformat())
    CurrencyMonthlyValue.get_or_create_data(df.iterrows())

