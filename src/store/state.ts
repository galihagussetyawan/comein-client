import { atom } from "nanostores";

export const dummyProfileData = {
  status: 200,
  message: "success get insights",
  data: {
    id: "17841461328655463",
    username: "comein.ig",
    followers_count: 3,
    follows_count: 58,
    media_count: 3,
    insights: {
      data: [
        {
          name: "reach",
          period: "day",
          title: "Reach",
          value: 6,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
        {
          name: "profile_views",
          period: "day",
          title: "Profile views",
          value: 23,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
        {
          name: "impressions",
          period: "day",
          title: "Impressions",
          value: 17,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
        {
          name: "website_clicks",
          period: "day",
          title: "Website clicks",
          value: 0,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
      ],
      paging: {
        previous:
          "https://graph.facebook.com/v17.0/17841461328655463/insights?access_token=EAATN7clSelMBO8dOH8AvogLx9IXxPzaCB1t4kOQjvIkKkQ0slgxqAXGVS2VwCXOwIZCQjWRMdumrg8cTTXh4GwM63SXhty58ZB7dchZAhO129rLzf37397UPbLgWQgpyLMltoTnKZAwKcCi21ldjWQaSdYxSBDWHZC5x58pBIqdElZBdCWoJn9lVPSZCF7sR27GIFvTB9ZC00biQFk1PZC6PgLZBbGfHL0EtEZC9zHSflzM5wS8icKrq1xFOFO0InNN&since=1693785599&until=1693958399&metric=reach%2Cprofile_views%2Cimpressions%2Cwebsite_clicks&period=day",
        next: "https://graph.facebook.com/v17.0/17841461328655463/insights?access_token=EAATN7clSelMBO8dOH8AvogLx9IXxPzaCB1t4kOQjvIkKkQ0slgxqAXGVS2VwCXOwIZCQjWRMdumrg8cTTXh4GwM63SXhty58ZB7dchZAhO129rLzf37397UPbLgWQgpyLMltoTnKZAwKcCi21ldjWQaSdYxSBDWHZC5x58pBIqdElZBdCWoJn9lVPSZCF7sR27GIFvTB9ZC00biQFk1PZC6PgLZBbGfHL0EtEZC9zHSflzM5wS8icKrq1xFOFO0InNN&since=1694131201&until=1694304001&metric=reach%2Cprofile_views%2Cimpressions%2Cwebsite_clicks&period=day",
      },
    },
  },
};

export const dummyComparisonProfileData = {
  status: 200,
  message: "success get insights",
  data: {
    id: "17841461328655463",
    username: "comein.ig",
    followers_count: 3,
    follows_count: 58,
    media_count: 3,
    insights: {
      data: [
        {
          name: "reach",
          period: "day",
          title: "Reach",
          value: 6,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
        {
          name: "profile_views",
          period: "day",
          title: "Profile views",
          value: 23,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
        {
          name: "impressions",
          period: "day",
          title: "Impressions",
          value: 11,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
        {
          name: "website_clicks",
          period: "day",
          title: "Website clicks",
          value: 0,
          since: "2023-09-06T07:00:00+0000",
          until: "2023-09-07T07:00:00+0000",
        },
      ],
      paging: {
        previous:
          "https://graph.facebook.com/v17.0/17841461328655463/insights?access_token=EAATN7clSelMBO8dOH8AvogLx9IXxPzaCB1t4kOQjvIkKkQ0slgxqAXGVS2VwCXOwIZCQjWRMdumrg8cTTXh4GwM63SXhty58ZB7dchZAhO129rLzf37397UPbLgWQgpyLMltoTnKZAwKcCi21ldjWQaSdYxSBDWHZC5x58pBIqdElZBdCWoJn9lVPSZCF7sR27GIFvTB9ZC00biQFk1PZC6PgLZBbGfHL0EtEZC9zHSflzM5wS8icKrq1xFOFO0InNN&since=1693785599&until=1693958399&metric=reach%2Cprofile_views%2Cimpressions%2Cwebsite_clicks&period=day",
        next: "https://graph.facebook.com/v17.0/17841461328655463/insights?access_token=EAATN7clSelMBO8dOH8AvogLx9IXxPzaCB1t4kOQjvIkKkQ0slgxqAXGVS2VwCXOwIZCQjWRMdumrg8cTTXh4GwM63SXhty58ZB7dchZAhO129rLzf37397UPbLgWQgpyLMltoTnKZAwKcCi21ldjWQaSdYxSBDWHZC5x58pBIqdElZBdCWoJn9lVPSZCF7sR27GIFvTB9ZC00biQFk1PZC6PgLZBbGfHL0EtEZC9zHSflzM5wS8icKrq1xFOFO0InNN&since=1694131201&until=1694304001&metric=reach%2Cprofile_views%2Cimpressions%2Cwebsite_clicks&period=day",
      },
    },
  },
};

export const isLoggedIn = atom<boolean>(false);
isLoggedIn.subscribe((v) => {
  if (localStorage.getItem("profile")) {
    isLoggedIn.set(true);
  }
});

export const account = atom<any>(null);
export const profileInsights = atom<any>(dummyProfileData.data);
export const comparisonProfileInsights = atom<any>(
  dummyComparisonProfileData.data
);
