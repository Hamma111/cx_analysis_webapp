from datetime import date

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView

from cx_analysis.currencies.models import Currency, CurrencyMonthlyValue
from cx_analysis.currencies.serializers import CurrencySerializer, CurrencyMonthlyValueSerializer


class CurrencyListAPIView(ListAPIView):
    queryset = Currency.active_objects.order_by('name')
    serializer_class = CurrencySerializer


class CurrencyMonthlyValuesListAPIView(ListAPIView):
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_fields = {
        "date": ['gte', 'lte', 'exact'],
    }
    ordering_fields = ["currency__country", "date"]

    serializer_class = CurrencyMonthlyValueSerializer

    def get_queryset(self):
        qs = CurrencyMonthlyValue.active_objects.all()

        currency_param = self.request.query_params.get("currency")
        if currency_param:
            qs = qs.filter(currency__in=currency_param.split(","))

        return qs

    def list(self, request, *args, **kwargs):
        ret = super().list(request, *args, **kwargs)

        currencies = {x['currency']['display_name'] for x in ret.data}


        return ret
