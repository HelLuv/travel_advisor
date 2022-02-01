import * as React from 'react';
import KeyBuilder from "../../api/KeyBuilder";

interface WeatherProps {
  weatherData: { list: Array<any> };
}

const Weather: React.FC<WeatherProps> = ({weatherData}) => {

  return (
    <>
      {weatherData?.list?.map((item) => (
          // @ts-ignore
          <div key={KeyBuilder.build} lat={item?.coord?.lat} lng={item?.coord?.lon}>
            <img height={80} src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt={item?.name}/>
          </div>
        )
      )}
    </>
  )
};

export default React.memo(Weather);