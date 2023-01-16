from rest_framework import serializers

from cx_analysis.currencies.models import Currency, CurrencyMonthlyValue


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ("id", "country", "name", "display_name")


class CurrencyMonthlyValueSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = CurrencyMonthlyValue
        fields = ("id", "usd_1", "date", 'currency')
