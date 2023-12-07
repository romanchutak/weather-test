export type TResponseWeather = {
    location: TLocation;
    current: TCurrent;
};

type TLocation = {
    [key: string]: any;
};

type TCurrent = {
    temp_c: string;
    [key: string]: any;
};
