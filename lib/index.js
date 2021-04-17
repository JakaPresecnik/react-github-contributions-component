"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GithubContribution = GithubContribution;

var _graphqlReact = require("graphql-react");

var _react = _interopRequireWildcard(require("react"));

var _lib = _interopRequireDefault(require("./lib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;
var colors = {
  dark: {
    "NONE": '#161b22',
    "FIRST_QUARTILE": '#033a16',
    "SECOND_QUARTILE": '#0f5323',
    "THIRD_QUARTILE": '#196c2e',
    "FOURTH_QUARTILE": '#2ea043',
    plainFont: "#6C756E",
    highlightedFont: "#749179"
  },
  light: {
    "NONE": '#f5f6f8',
    "FIRST_QUARTILE": '#9be9a8',
    "SECOND_QUARTILE": '#40c463',
    "THIRD_QUARTILE": '#30a14e',
    "FOURTH_QUARTILE": '#216e39',
    plainFont: "#657786",
    highlightedFont: "#48524d"
  },
  purpleDark: {
    "NONE": '#669999',
    "FIRST_QUARTILE": '#666699',
    "SECOND_QUARTILE": '#653399',
    "THIRD_QUARTILE": '#663366',
    "FOURTH_QUARTILE": '#650099',
    plainFont: "#545179",
    highlightedFont: "#674973"
  },
  jokerLight: {
    "NONE": '#ddddd5',
    "FIRST_QUARTILE": '#848c24',
    "SECOND_QUARTILE": '#905c35',
    "THIRD_QUARTILE": '#ab341c',
    "FOURTH_QUARTILE": '#331b5c',
    plainFont: "#433c24",
    highlightedFont: "#1d140a"
  },
  jokerDark: {
    "NONE": '#1d140a',
    "FIRST_QUARTILE": '#331b5c',
    "SECOND_QUARTILE": '#ab341c',
    "THIRD_QUARTILE": '#858a23',
    "FOURTH_QUARTILE": '#ddddd5',
    plainFont: "#433c24",
    highlightedFont: "#ab341c"
  }
};

function fetchOptionsOverride(options) {
  options.url = 'https://api.github.com/graphql';
  options.headers.Authorization = "Bearer ".concat(token);
}

var query =
/* GraphQL */
"\nquery ($userName:String!, $toDate:DateTime!, $fromDate: DateTime!) { \n    user(login: $userName) {\n      contributionsCollection(from: $fromDate, to: $toDate) {\n        contributionCalendar {\n          totalContributions\n          weeks {\n            contributionDays {\n              weekday\n              date \n              contributionCount \n              color\n              contributionLevel\n            }\n          }\n          months  {\n            name\n              year\n              firstDay\n              totalWeeks  \n          }\n        }\n      }\n    }\n  }\n";

function GithubContributionCount(_ref) {
  var userName = _ref.userName,
      toDate = _ref.toDate,
      fromDate = _ref.fromDate,
      theme = _ref.theme,
      vertical = _ref.vertical;

  // Memoization allows the `useGraphQL` hook to avoid work in following renders
  // with the same GraphQL operation.
  var _useState = (0, _react.useState)(640),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];

  var _useState3 = (0, _react.useState)(137),
      _useState4 = _slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];

  var operation = _react["default"].useMemo(function () {
    return {
      query: query,
      variables: {
        userName: userName,
        toDate: toDate,
        fromDate: fromDate
      }
    };
  }, [userName, toDate, fromDate]); // The `useGraphQL` hook can be used for both queries and mutations.


  var _useGraphQL = (0, _graphqlReact.useGraphQL)({
    operation: operation,
    fetchOptionsOverride: fetchOptionsOverride,
    // Load the query whenever the component mounts. This is desirable for
    // queries to display content, but not for on demand situations like
    // pagination view more buttons or forms that submit mutations.
    loadOnMount: true,
    // Reload the query whenever a global cache reload is signaled.
    loadOnReload: true,
    // Reload the query whenever the global cache is reset. Resets immediately
    // delete the cache and are mostly only used when logging out the user.
    loadOnReset: true
  }),
      loading = _useGraphQL.loading,
      cacheValue = _useGraphQL.cacheValue;

  if (cacheValue !== null && cacheValue !== void 0 && cacheValue.data) {
    var contributions = cacheValue.data.user.contributionsCollection.contributionCalendar;
    var weekData = contributions.weeks;
    var monthData = contributions.months;
    return /*#__PURE__*/_react["default"].createElement("svg", {
      width: vertical ? height + 60 : width,
      height: vertical ? width / 1.5 : height
    }, monthData.map(function (month, i) {
      return /*#__PURE__*/_react["default"].createElement("text", {
        style: {
          fontFamily: 'Helvetica',
          fontSize: '12px'
        },
        x: vertical ? 35 : 13 + i * width / 12,
        y: vertical ? 10 + i * width / 20 : 20,
        fill: colors[theme].plainFont,
        key: month.name
      }, month.name);
    }), weekData.map(function (week, i) {
      return week.contributionDays.map(function (day) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
          key: day.date
        }, /*#__PURE__*/_react["default"].createElement("rect", {
          width: 10,
          height: vertical ? 6 : 10,
          fill: colors[theme][day.contributionLevel],
          x: vertical ? 60 + day.weekday * 11 : i * 12,
          y: vertical ? i * 7 : 25 + day.weekday * 13,
          rx: "2",
          ry: "2"
        }));
      });
    }), /*#__PURE__*/_react["default"].createElement("text", {
      style: {
        fontFamily: 'Helvetica',
        fontSize: '14px'
      },
      fill: colors[theme].plainFont,
      x: "15",
      y: vertical ? 2 + width / 1.6 : 134
    }, "Total contributions in ", monthData[0].year, ":"), /*#__PURE__*/_react["default"].createElement("text", {
      style: {
        fontFamily: 'Helvetica',
        fontSize: '16px',
        fontWeight: 'bold'
      },
      fill: colors[theme].highlightedFont,
      x: vertical ? height / 1.7 : 200,
      y: vertical ? 2 + width / 1.52 : 134
    }, contributions.totalContributions));
  } else {
    return loading ? /*#__PURE__*/_react["default"].createElement(_lib["default"], {
      width: "640",
      height: "137"
    }) : /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", null, "Error! Check your github token."));
  }
}

var graphql = new _graphqlReact.GraphQL();

function GithubContribution(_ref2) {
  var userName = _ref2.userName,
      theme = _ref2.theme,
      vertical = _ref2.vertical;

  var _useState5 = (0, _react.useState)({
    year: new Date().getFullYear(),
    toDate: new Date().toISOString(),
    fromDate: new Date("January 01 ".concat(new Date().getFullYear(), " 00:00:01 GMT-00:00")).toISOString()
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      dateRange = _useState6[0],
      setDates = _useState6[1];

  var pastYear = function pastYear(e) {
    e.preventDefault();
    var year = dateRange.year - 1;
    setDates({
      year: year,
      toDate: new Date("December 31 ".concat(year, " 23:59:59 GMT-00:00")).toISOString(),
      fromDate: new Date("January 01 ".concat(year, " 00:00:01 GMT-00:00")).toISOString()
    });
  };

  var nextYear = function nextYear(e) {
    e.preventDefault();

    if (dateRange.year === new Date().getFullYear()) {
      console.log('Cannot see into the future!');
    } else {
      var year = dateRange.year + 1;
      setDates({
        year: year,
        toDate: new Date(year === new Date().getFullYear() ? new Date().toISOString() : "December 31 ".concat(year, " 23:59:59 GMT-00:00")).toISOString(),
        fromDate: new Date("January 01 ".concat(year, " 00:00:01 GMT-00:00")).toISOString()
      });
    }
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_graphqlReact.GraphQLProvider, {
    graphql: graphql
  }, /*#__PURE__*/_react["default"].createElement(GithubContributionCount, {
    userName: userName,
    toDate: dateRange.toDate,
    fromDate: dateRange.fromDate,
    theme: theme,
    vertical: vertical
  }), /*#__PURE__*/_react["default"].createElement("svg", {
    width: "640",
    height: "10"
  }, /*#__PURE__*/_react["default"].createElement("polyline", {
    onClick: function onClick(e) {
      return nextYear(e);
    },
    points: "280, 0 270, 5 280, 10",
    stroke: colors[theme].highlightedFont,
    strokeWidth: "4",
    fill: "none"
  }), /*#__PURE__*/_react["default"].createElement("polyline", {
    onClick: function onClick(e) {
      return pastYear(e);
    },
    points: "360, 0 370, 5 360, 10",
    stroke: colors[theme].highlightedFont,
    strokeWidth: "4",
    fill: "none"
  }))));
}