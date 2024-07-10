import './filterbar.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
export default function FilterBar() {
    const [selectedindex, setSelectedindex] = useState('');
    const [selectedProducer, setSelectedProducer] = useState('');
    const [selectedRAM, setSelectedRAM] = useState('');
    const dataPrice = [
        { index: 'Trên 40 Triệu', value: '40000000 1000000000 ' },
        { index: 'Từ 30 - 40 Triệu', value: '30000000 40000000' },
        { index: 'Từ 20 - 30 triệu', value: '20000000 30000000' },
        { index: 'Từ 15 - 20 triệu', value: '15000000 20000000' },
        { index: 'Từ 10 - 15 triệu', value: '10000000 15000000' },
        { index: 'Từ 5 - 10 Triệu', value: '5000000 10000000' },
    ];
    const dataProducer = [
        { index: 'Dell', value: 'DELL' },
        { index: 'HP', value: 'HP' },
        { index: 'Acer', value: 'ACER' },
        { index: 'Lenovo', value: 'LENOVO' },
        { index: 'Asus', value: 'ASUS' },
        { index: 'Microsoft surface', value: 'SURFACE' },
        { index: 'Macbook', value: 'APPLE' },
    ];
    const dataRAM = [
        { index: '4 GB', value: '4' },
        { index: '8 GB', value: '8' },
        { index: '16 GB', value: '16' },
        { index: '32 GB', value: '32' },
        { index: '64 GB', value: '64' },
        { index: '128 GB', value: '128' },
    ];
    // const filteredData = data.filter((item) => selectedindex === '' || item.index === selectedindex);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const paramsArray = [...queryParams.entries()];
    const obj = Object.fromEntries(paramsArray);
    // console.log('pathname', location.pathname);
    const handleChange = (event) => {
        setSelectedindex(event.target.value);
    };
    const handleChangeProducer = (event) => {
        setSelectedProducer(event.target.value);
    };
    const handleChangeRAM = (event) => {
        setSelectedRAM(event.target.value);
    };
    useEffect(() => {
        const handleFilter = () => {
            const price = selectedindex.split(' ');
            if (price.length > 1) {
                obj.price1 = price[0];
                obj.price2 = price[1];
            } else {
                obj.price1 = null;
                obj.price2 = null;
            }
            if (selectedProducer.length > 0) {
                obj.producer = selectedProducer;
            } else {
                obj.producer = null;
            }
            if (selectedRAM.length > 0) {
                obj.ram = selectedRAM;
            } else {
                obj.ram = null;
            }
            const newSearch = queryString.stringify(obj);
            // console.log('obj', obj);
            navigate({ pathname: '/type', search: newSearch });
        };
        handleFilter();
    }, [selectedindex, selectedProducer, selectedRAM]);
    // console.log('selectedindex', selectedindex);
    return (
        <div className="filterBar" style={{ padding: '0px 15px' }}>
            <div>
                <h4
                    className="filterName"
                    style={{
                        textTransform: 'uppercase',
                        color: '#eb2028',
                        borderBottom: '1px solid #cdcdcd',
                        fontSize: 18,
                    }}
                >
                    Mức giá
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            padding: '15px 0px 10px 28px',
                            display: 'inline-block',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <strong>Tất cả</strong>
                        <input
                            type="checkbox"
                            className="checkboxInput"
                            id="all-prices"
                            name="index"
                            value=""
                            checked={selectedindex === ''}
                            onChange={handleChange}
                        />
                        <span className="Checkmark"></span>
                    </label>
                    {dataPrice.map((item) => (
                        <label
                            key={item.index}
                            style={{
                                padding: '10px 0px 10px 28px',
                                position: 'relative',
                                display: 'inline-block',
                                cursor: 'pointer',
                            }}
                        >
                            <strong>{item.index}</strong>
                            <input
                                type="checkbox"
                                // id={item.index}
                                className="checkboxInput"
                                name="index"
                                value={item.value}
                                checked={selectedindex === item.value}
                                onChange={handleChange}
                            />
                            <span className="Checkmark"></span>
                        </label>
                    ))}
                </div>
                {/* <h3>{selectedindex}</h3> */}
                <button onClick={() => setSelectedindex('')}>RESET</button>
            </div>
            {/* Lọc theo thương hiệu */}
            <div style={{ paddingTop: 10 }}>
                <h4
                    className="filterName"
                    style={{
                        textTransform: 'uppercase',
                        color: '#eb2028',
                        borderBottom: '1px solid #cdcdcd',
                        fontSize: 18,
                    }}
                >
                    Thương hiệu
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            padding: '15px 0px 10px 28px',
                            display: 'inline-block',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <strong>Tất cả</strong>
                        <input
                            type="checkbox"
                            className="checkboxInput"
                            id="all-prices"
                            name="index"
                            value=""
                            checked={selectedProducer === ''}
                            onChange={handleChangeProducer}
                        />
                        <span className="Checkmark"></span>
                    </label>
                    {dataProducer.map((item) => (
                        <label
                            key={item.index}
                            style={{
                                padding: '10px 0px 10px 28px',
                                position: 'relative',
                                display: 'inline-block',
                                cursor: 'pointer',
                            }}
                        >
                            <strong>{item.index}</strong>
                            <input
                                type="checkbox"
                                // id={item.index}
                                className="checkboxInput"
                                name="index"
                                value={item.value}
                                checked={selectedProducer === item.value}
                                onChange={handleChangeProducer}
                            />
                            <span className="Checkmark"></span>
                        </label>
                    ))}
                </div>
                <button onClick={() => setSelectedProducer('')}>RESET</button>
            </div>
            {/* lọc theo RAM */}
            <div>
                <h4
                    className="filterName"
                    style={{
                        textTransform: 'uppercase',
                        color: '#eb2028',
                        borderBottom: '1px solid #cdcdcd',
                        fontSize: 18,
                    }}
                >
                    RAM
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                        style={{
                            padding: '15px 0px 10px 28px',
                            display: 'inline-block',
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <strong>Tất cả</strong>
                        <input
                            type="checkbox"
                            className="checkboxInput"
                            id="all-prices"
                            name="index"
                            value=""
                            checked={selectedRAM === ''}
                            onChange={handleChangeRAM}
                        />
                        <span className="Checkmark"></span>
                    </label>
                    {dataRAM.map((item) => (
                        <label
                            key={item.index}
                            style={{
                                padding: '10px 0px 10px 28px',
                                position: 'relative',
                                display: 'inline-block',
                                cursor: 'pointer',
                            }}
                        >
                            <strong>{item.index}</strong>
                            <input
                                type="checkbox"
                                // id={item.index}
                                className="checkboxInput"
                                name="index"
                                value={item.value}
                                checked={selectedRAM === item.value}
                                onChange={handleChangeRAM}
                            />
                            <span className="Checkmark"></span>
                        </label>
                    ))}
                </div>
                <button onClick={() => setSelectedRAM('')}>RESET</button>
            </div>
        </div>
    );
}
