import { GraphQL, GraphQLProvider, useGraphQL } from 'graphql-react';
import React, { useState } from 'react';
import Loading from './lib';

const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

const colors = {
    dark: {"NONE": '#161b22', "FIRST_QUARTILE": '#033a16', "SECOND_QUARTILE": '#0f5323',
    "THIRD_QUARTILE": '#196c2e', "FOURTH_QUARTILE": '#2ea043', plainFont: "#6C756E", highlightedFont: "#749179"},
    light: {"NONE": '#f5f6f8', "FIRST_QUARTILE": '#9be9a8', "SECOND_QUARTILE": '#40c463',"THIRD_QUARTILE": '#30a14e', 
    "FOURTH_QUARTILE": '#216e39', plainFont: "#657786", highlightedFont: "#48524d"},
    purpleDark: {"NONE": '#669999', "FIRST_QUARTILE": '#666699', "SECOND_QUARTILE": '#653399',
    "THIRD_QUARTILE": '#663366', "FOURTH_QUARTILE": '#650099', plainFont: "#545179", highlightedFont: "#674973"},
    jokerLight: {"NONE": '#ddddd5', "FIRST_QUARTILE": '#848c24', "SECOND_QUARTILE": '#905c35',
    "THIRD_QUARTILE": '#ab341c', "FOURTH_QUARTILE": '#331b5c', plainFont: "#433c24", highlightedFont: "#1d140a"},
    jokerDark: {
        "NONE": '#1d140a', 
        "FIRST_QUARTILE": '#331b5c', 
        "SECOND_QUARTILE": '#ab341c',
        "THIRD_QUARTILE": '#858a23', 
        "FOURTH_QUARTILE": '#ddddd5', 
        plainFont: "#433c24", 
        highlightedFont: "#ab341c"
    }
}

function fetchOptionsOverride(options) {
    options.url = 'https://api.github.com/graphql';
    options.headers.Authorization = `Bearer ${token}`;
}

const query = /* GraphQL */ `
query ($userName:String!, $toDate:DateTime!, $fromDate: DateTime!) { 
    user(login: $userName) {
      contributionsCollection(from: $fromDate, to: $toDate) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              weekday
              date 
              contributionCount 
              color
              contributionLevel
            }
          }
          months  {
            name
              year
              firstDay
              totalWeeks  
          }
        }
      }
    }
  }
`;

function GithubContributionCount({userName, toDate, fromDate, theme, vertical}) {
    // Memoization allows the `useGraphQL` hook to avoid work in following renders
    // with the same GraphQL operation.
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(137);

    const operation = React.useMemo(
      () => ({
        query,
        variables: {
            userName,
            toDate,
            fromDate
        },
      }),
      [userName, toDate, fromDate]
    );

    // The `useGraphQL` hook can be used for both queries and mutations.
    const { loading, cacheValue } = useGraphQL({
      operation,
      fetchOptionsOverride,
  
      // Load the query whenever the component mounts. This is desirable for
      // queries to display content, but not for on demand situations like
      // pagination view more buttons or forms that submit mutations.
      loadOnMount: true,
  
      // Reload the query whenever a global cache reload is signaled.
      loadOnReload: true,
  
      // Reload the query whenever the global cache is reset. Resets immediately
      // delete the cache and are mostly only used when logging out the user.
      loadOnReset: true,
    });

    if(cacheValue?.data) {
        const contributions = cacheValue.data.user.contributionsCollection.contributionCalendar
        const weekData = contributions.weeks;
        const monthData = contributions.months;
        return (
            <svg width={vertical ? height + 60 : width} height={vertical ? width / 1.5 : height}>
                {
                    monthData.map((month, i) => (
                        <text
                            style={{fontFamily: 'Helvetica', fontSize: '12px'}}
                            x={vertical ? 35 : 13 + (i * width / 12)} 
                            y={vertical ? 10 + (i * width  / 20) : 20}
                            fill={colors[theme].plainFont}
                            key={month.name}>{month.name}</text>
                        ))
                }
                {
                    weekData.map((week, i) => (
                        week.contributionDays.map(day => (
                            <React.Fragment key={day.date}>
                                <rect 
                                    width={10} 
                                    height={vertical ? 6 : 10} 
                                    fill={colors[theme][day.contributionLevel]}
                                    x={vertical ? 60 + day.weekday * 11 : i * 12} 
                                    y={vertical ? i * 7 : 25 + day.weekday * 13}
                                    rx="2"
                                    ry="2">
                                </rect>
                            </React.Fragment>
                        ))
                    ))
                }
                <text 
                    style={{fontFamily: 'Helvetica', fontSize: '14px'}}
                    fill={colors[theme].plainFont}
                    x="15" 
                    y={vertical ?  2 + width / 1.6 : 134}>Total contributions in {monthData[0].year}:
                </text>
                <text 
                    style={{fontFamily: 'Helvetica', fontSize: '16px', fontWeight: 'bold'}}
                    fill={colors[theme].highlightedFont}
                    x={vertical ? height / 1.7 : 200} 
                    y={vertical ?  2 + width / 1.52 : 134}>{contributions.totalContributions}
                </text>
            </svg>
        )
    } else {
        return loading ? (
            <Loading width="640" height="137" />
        ) : (<div>
            <p>Error! Check your github token.</p>
        </div>);
    }
}

const graphql = new GraphQL();

function GithubContribution ({userName, theme, vertical}) {

    const [dateRange, setDates] = useState({
        year: new Date().getFullYear(),
        toDate: new Date().toISOString(),
        fromDate: new Date(`January 01 ${new Date().getFullYear()} 00:00:01 GMT-00:00`).toISOString(),
    })
    const pastYear = (e) => {
        e.preventDefault();
        let year = dateRange.year - 1;
        setDates({
            year,
            toDate: new Date(`December 31 ${year} 23:59:59 GMT-00:00`).toISOString(),
            fromDate: new Date(`January 01 ${year} 00:00:01 GMT-00:00`).toISOString(),
        })
    }
    const nextYear = (e) => {
        e.preventDefault();
        if (dateRange.year === new Date().getFullYear()) {
            console.log('Cannot see into the future!')
        }else {
            let year = dateRange.year + 1;
            setDates({
                year,
                toDate: new Date(year === new Date().getFullYear()
                ? new Date().toISOString()
                :`December 31 ${year} 23:59:59 GMT-00:00`).toISOString(),
                fromDate: new Date(`January 01 ${year} 00:00:01 GMT-00:00`).toISOString(),
            })
        }
    }  
    return (
        <div>
            <GraphQLProvider graphql={graphql}>
                <GithubContributionCount 
                    userName={userName} 
                    toDate={dateRange.toDate} 
                    fromDate={dateRange.fromDate} 
                    theme={theme} 
                    vertical={vertical} />
                <svg width="640" height="10">
                    <polyline 
                        onClick={e => nextYear(e)}
                        points="280, 0 270, 5 280, 10" 
                        stroke={colors[theme].highlightedFont} 
                        strokeWidth="4" 
                        fill="none" />
                    <polyline 
                        onClick={e => pastYear(e)}
                        points="360, 0 370, 5 360, 10" 
                        stroke={colors[theme].highlightedFont} 
                        strokeWidth="4" 
                        fill="none" />
                </svg>
            </GraphQLProvider>
        </div>
    )
}
export {GithubContribution};