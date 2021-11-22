import { useEffect, useState, useMemo } from "react"
import { makeStyles } from "@material-ui/styles"
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, TextField, TableContainer, InputAdornment } from "@material-ui/core"
import { exchangeListUA, dataRowsUSD, dataRowsEuro, dataRowsRub, dataRowsPound, dataRowsFrSw, dataRowsZlot, dataRowsCrona } from "../../files/data/mocData"
import { Tabs, Tab, Panel } from '@bumaga/tabs' 
import searchIcon from '../../files/images/UI/search.png'
import { SpinnerContent } from "../UI/SpinnerContent"
// import styled from 'styled-components'
import "react-tabs/style/react-tabs.css"

const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px',
    background: '#fff',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 6,
    marginBottom: 30,
    fontSize: 13
  },
  tabsWrapper: {
    padding: '0px 20px',
    background: '#fff',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 13
  },
  tabBtn: {
    border: 'none',
    background: '#F8F8F8',
    fontSize: 14,
    fontFamily: 'Gilroy, sans-serif',
    padding: 0,
    marginRight: 5,
    letterSpacing: '0.5px',
    color: '#2E3A59',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  table: {
    minWidth: 650
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
    alignItems: 'center'
  },
  headSummary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  unicodeRound: {
    color: theme.palette.text.secondary,
    fontSize: 8,
    marginRight: 8
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  currenciesHeader: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Play, sans-serif',
    fontWeight: 600
  },
  currenciesValues: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Play, sans-serif',
    fontWeight: 500
  },
  bankIcon: {
    paddingRight: 30,
    verticalAlign: 'middle'
  },
  tableRegularText: {
    lineHeight: '150%',
    fontWeight: 'normal',
    fontFamily: 'Roboto, sans-serif',
  },
  bankTitle: {
    fontSize: 12, 
    fontFamily: 'Roboto, sans-serif',
    lineHeight: '150%'
  },
  bankRates: {
    fontSize: 12, 
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 'bold',
    lineHeight: '150%'
  },
  tableBoldText: {
    display: 'block',
    fontFamily: 'Gilroy, sans-serif', 
    fontWeight: 'bold',
    fontSize: 14
  },
  tableHeadRow: {
    fontSize: 14,
    margin: 0,
    padding: 0,
    borderBottom: '1px solid #E9E9E9'
  },
  tableHeadCell: {
    padding: 0,
    margin: 0,
    textAlign: 'right'
  },
  tableHeadCellRight: {
    textAlign: 'right'
  },
  tableBodyCell: {
    padding: '10px 0', 
    minWidth: 20,
    borderBottom: 'none'
  },
  tabPanel: {
    marginLeft: 0,
    margin: 0,
    paddingBottom: 15,
    minWidth: '245px' 
  },
  tableRowText: {
    fontSize: 11,
    margin: '5px 0'
  },
  search: {
    height: '37px',
    borderRadius: '8px',
    '&:hover': {
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: 'auto',
      width: 'auto',
    },
    [theme.breakpoints.up('xs') && theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      textAlign: 'right',
      left: 50
    }
  },
  searchInput: {
    padding: 0,
    margin: 0,
    width: '9.25vw',
    background: '#F3F3F3',
    color: 'red',
    border: '1px solid #fff'
  },
  searchIcon: {
    width: 20
  },
  noBorder: {
    border: 'none'
  },
  sortSpan: {
    color: '#B8B8B8',
    fontSize: 12,
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// const Tab = styled.button`
//   padding: 10px 30px;
//   cursor: pointer;
//   opacity: 0.6;
//   background: white;
//   border: 0;
//   outline: 0;
//   border-bottom: 2px solid transparent;
//   transition: ease border-bottom 250ms;
//   ${({ active }) =>
//     active &&
//     `
//     border-bottom: 2px solid black;
//     opacity: 1;
//   `}
// `;

const ProductTable = (props) => {
  const styles = useStyles()
  const { items, requestSort, sortConfig } = useSortableData(props.currencies);
  const { query, onInputChange } = props
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
  <TableContainer>
    <Table>
      <TableHead className={styles.tableHeadRow}>
        <TableRow>
          <TableCell component="th" rowSpan="2" сlassName={styles.tableHeadCell}>
            <div className={styles.search}>
              <TextField 
                value={query} 
                onChange={onInputChange}
                variant="outlined"
                placeholder="Пошук за назвою банка" 
                className={styles.searchinput}
                inputProps={{ 
                  style: { 
                    margin: '0 2px', 
                    color: 'red',
                    fontSize: 12, 
                    padding: '10px 0', 
                    fontFamily: 'Gilroy',
                    fontWeight: 400, 
                    lineHeight: '1.5px', 
                    color: '#000000',
                    borderRadius: '8px', 
                    '&::placeholder': {
                      color: '#B3B3B3'
                    }
                  } 
                }}
                InputProps={{
                  className: styles.searchInput,
                  startAdornment: (
                    <InputAdornment style={{ margin: '0 5px 0 5px', padding: 0 }}>
                      <img src={searchIcon} className={styles.searchIcon} />
                    </InputAdornment>
                  ),
                  classes: { 
                    notchedOutline:styles.noBorder
                  }
                }}
              />
            </div>
          </TableCell>
          <TableCell component="th" className={styles.tableHeadCell}>
            <Typography className={[styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>У касах банків</Typography>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
              <span style={{ color: '#B8B8B8', fontSize: 10 }} onClick={() => requestSort('paydesk_bye')} className={[getClassNamesFor('paydesk_bye'), styles.sortSpan].join(" ")}>Купівля&nbsp;&#8597;</span>
              <span className={styles.sortSpan}>&nbsp;/&nbsp;</span>
              <span style={{ color: '#B8B8B8', fontSize: 10 }} onClick={() => requestSort('paydesk_sell')} className={[getClassNamesFor('paydesk_sell'), styles.sortSpan].join(" ")}>Продаж&nbsp;&#8597;</span>
            </div>
          </TableCell>
          <TableCell component="th" className={styles.tableHeadCell}>
            <Typography className={[styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>При оплаті карткою</Typography>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
              <span style={{ color: '#B8B8B8', fontSize: 10 }} onClick={() => requestSort('card_bye')} className={[getClassNamesFor('card_bye'), styles.sortSpan].join(" ")}>Купівля&nbsp;&#8597;</span>
              <span className={styles.sortSpan}>&nbsp;/&nbsp;</span>
              <span style={{ color: '#B8B8B8', fontSize: 10 }} onClick={() => requestSort('card_sell')} className={[getClassNamesFor('card_sell'), styles.sortSpan].join(" ")}>Продаж&nbsp;&#8597;</span>
            </div>
          </TableCell>
          <TableCell component="th" className={styles.tableHeadCell}>
            <Typography className={[styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>При оплаті онлайн</Typography>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
              <span style={{ color: '#B8B8B8', fontSize: 10 }} onClick={() => requestSort('online_bye')} className={[getClassNamesFor('online_bye'), styles.sortSpan].join(" ")}>Купівля&nbsp;&#8597;</span>
              <span className={styles.sortSpan}>&nbsp;/&nbsp;</span>
              <span style={{ color: '#B8B8B8', fontSize: 10 }} onClick={() => requestSort('online_sell')} className={[getClassNamesFor('online_sell'), styles.sortSpan].join(" ")}>Продаж&nbsp;&#8597;</span>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {items
          .filter(row => {
            if (query === "") {
              return row
            } else if (row.title_ua.toLowerCase().includes(query.toLowerCase())) {
              return row
            }
          })
          .map(item => (
            <TableRow key={item.id}>
              <TableCell style={{ textAlign: "left" }}>
                <img src={item.icon} className={styles.bankIcon} />
                <span className={styles.bankTitle}>{item.title_ua}</span>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <span className={styles.bankRates}>{(item.paydesk_bye).toFixed(2)}</span>
                <span className={styles.bankRates}>&nbsp;/&nbsp;</span>
                <span className={styles.bankRates}>{(item.paydesk_sell).toFixed(2)}</span>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <span className={styles.bankRates}>{(item.card_bye).toFixed(2)}</span>
                <span className={styles.bankRates}>&nbsp;/&nbsp;</span>
                <span className={styles.bankRates}>{(item.card_sell).toFixed(2)}</span>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <span className={styles.bankRates}>{(item.online_bye).toFixed(2)}</span>
                <span className={styles.bankRates}>&nbsp;/&nbsp;</span>
                <span className={styles.bankRates}>{(item.online_sell).toFixed(2)}</span>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

const types = exchangeListUA

export const CurrencyFull = () => {
  const styles = useStyles()
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState(exchangeListUA[0])
  const [rowsEuro, setRowsEuro] = useState([])
  const [rowsUSD, setRowsUSD] = useState([])
  const [rowsRub, setRowsRub] = useState([])
  const [rowsPound, setRowsPound] = useState([])
  const [rowsFrSw, setRowsFrSw] = useState([])
  const [rowsZlot, setRowsZlot] = useState([])
  const [rowsCrona, setRowsCrona] = useState([])
  const [searchedEuro, setSearchedEuro] = useState("")
  const [searchedUSD, setSearchedUSD] = useState("")
  const [searchedRub, setSearchedRub] = useState("")
  const [searchedPound, setSearchedPound] = useState("")
  const [searchedFrSw, setSearchedFrSw] = useState("")
  const [searchedZlot, setSearchedZlot] = useState("")
  const [searchedCrona, setSearchedCrona] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      setTimeout(() => {
        setRowsEuro(dataRowsEuro)
        setRowsEuro(dataRowsEuro)
        setRowsUSD(dataRowsUSD)
        setRowsRub(dataRowsRub)
        setRowsPound(dataRowsPound)
        setRowsFrSw(dataRowsFrSw)
        setRowsZlot(dataRowsZlot)
        setRowsCrona(dataRowsCrona)
        setLoading(false)
      }, 500)
    }
    setContent()
  }, [])

  console.log(active, tab)

  const handleClick = (newType, newIndex) => {
    console.log("clicked")
    setActive(newType)
    setTab(newIndex)
  }

  return !loading 
  ? <>
  <div className={styles.main}>
    <div className={styles.headSummary}>
      <div className={styles.row}>
        <span className={styles.unicodeRound}>&#11044;</span>
        <span className={styles.label}>Курс валют на сьогодні</span> 
      </div>
    </div>
    <Tabs>
      <div style={{ textAlign: 'left' }}>
        { types.map((type, index) => (
          <Tab tab={tab} key={type} active={active == type} onClick={(type, index) => handleClick(type, index)}>
            <button 
              // key={type}
              onClick={() => console.log("clicked")}
              style={{ 
                // color: (active && index == activeIndex) ? '#5669FF' : 'black',
                // fontWeight: (active && index == activeIndex) ? 600 : 'normal',
                borderBottom: active == type ? '2px solid #5669FF': 'none',
              }} 
              className={styles.tabBtn}>{type}
            </button>
          </Tab>)) }
      </div>

      <Panel><ProductTable currencies={rowsEuro} query={searchedEuro} onInputChange={e => setSearchedEuro(e.target.value)} /></Panel>
      <Panel><ProductTable currencies={rowsUSD} query={searchedUSD} onInputChange={e => setSearchedUSD(e.target.value)} /></Panel>
      <Panel><ProductTable currencies={rowsRub} query={searchedRub} onInputChange={e => setSearchedRub(e.target.value)} /></Panel>
      <Panel><ProductTable currencies={rowsPound} query={searchedPound} onInputChange={e => setSearchedPound(e.target.value)} /></Panel>
      <Panel><ProductTable currencies={rowsFrSw} query={searchedFrSw} onInputChange={e => setSearchedFrSw(e.target.value)} /></Panel>
      <Panel><ProductTable currencies={rowsZlot} query={searchedZlot} onInputChange={e => setSearchedZlot(e.target.value)} /></Panel>
      <Panel><ProductTable currencies={rowsCrona} query={searchedCrona} onInputChange={e => setSearchedCrona(e.target.value)} /></Panel>

    </Tabs>
    </div>
          {/* <div>
            {types.map((type) => (
              <Tab
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
              >
                {type}
              </Tab>
            ))}
          </div>
          <p />
          <p> Your payment selection: {active} </p>
      </div> */}
  </> 
  : <SpinnerContent loadingStatus={loading} />
}