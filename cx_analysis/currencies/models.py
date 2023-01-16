from datetime import datetime

from django.db import models

from cx_analysis.core.models import BaseModel
from cx_analysis.currencies.constants import STANDARD_DATETIME_FORMAT


class Currency(BaseModel):
    country = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    @property
    def display_name(self):
        return f"{self.country} ({self.name})"

    def __str__(self):
        return f"{self.country} | {self.name}"


class CurrencyMonthlyValue(BaseModel):
    usd_1 = models.FloatField()
    date = models.DateField()

    currency = models.ForeignKey(
        "currencies.Currency", on_delete=models.PROTECT, related_name="monthly_values"
    )

    @classmethod
    def get_or_create_data(cls, data):
        currency_monthly_values = []

        for _, row in data:
            currency = Currency.objects.filter(name=row['currency']).first()
            if not currency:
                print(currency)

            currency_monthly_value, _ = CurrencyMonthlyValue.objects.get_or_create(
                currency=currency,
                date=datetime.strptime(row['date'], STANDARD_DATETIME_FORMAT).date(),
                defaults={'usd_1': row['usd_1']},
            )

            currency_monthly_values.append(currency_monthly_value)

        return currency_monthly_values

    def __str__(self):
        return f"{self.currency} | {self.date}"
