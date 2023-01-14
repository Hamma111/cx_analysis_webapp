from django.db import models
from django.db.models import Transform
from django.db.models.fields import Field
from django.utils import timezone
from django_extensions.db.models import TimeStampedModel


class classproperty(property):
    def __get__(self, owner_self, owner_cls):
        return self.fget(owner_cls)


class BaseModel(TimeStampedModel):
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(default=timezone.now)

    @classproperty
    def active_objects(cls):
        return cls.objects.filter(is_active=True)

    class Meta:
        abstract = True


@Field.register_lookup
class IntegerValue(Transform):
    lookup_name = "int"
    bilateral = True

    def as_sql(self, compiler, connection, **extra_context):
        sql, params = compiler.compile(self.lhs)
        sql = "CAST(%s AS DOUBLE PRECISION)" % sql
        return sql, params
