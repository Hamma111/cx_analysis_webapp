import requests

from cx_analysis.currencies.constants import SCRAPE_SITE_URL, HEADERS_WITH_USER_AGENT
import pandas as pd
import logging

logger = logging.getLogger(__name__)


def get_scraped_dataframe(date_to_scrape):
    url = SCRAPE_SITE_URL.format(date=date_to_scrape)
    site = requests.get(url, headers=HEADERS_WITH_USER_AGENT)
    print(url)
    if not site.ok:
        logger.error(f"Error making request: {site.__dict__}")
        raise Exception(
            f"Error making request: {site.status_code} {site.content}"
        )

    df = pd.read_html(site.content, flavor='lxml')[1]  # noqa
    df["data"] = date_to_scrape
    df.columns = ["currency", "usd_1", "inv_usd_1", "date"]

    return df
