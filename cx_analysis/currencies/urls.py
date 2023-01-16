from django.urls import path

from cx_analysis.currencies.views import CurrencyListAPIView, CurrencyMonthlyValuesListAPIView

urlpatterns = [
    path("", CurrencyListAPIView.as_view(), name="currencies_list"),
    path("monthly-values/", CurrencyMonthlyValuesListAPIView.as_view(), name='currency_monthly_values_list'),
]
