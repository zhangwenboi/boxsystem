interface SystemInfo {
    operatingSystem: string;
    release: string;
    totalMemory: number;
    freeMemory: number;
    cpus: Cpus[];
    networkInterfaces: NetworkInterfaces;
}

interface NetworkInterfaces {
    lo: Lo[];
    eth0: Lo[];
    zteb4o6es6: Lo[];
}

interface Lo {
    address: string;
    netmask: string;
    family: string;
    mac: string;
    internal: boolean;
    cidr: string;
    scopeid?: number;
}

interface Cpus {
    model: string;
    speed: number;
    times: Times;
}

interface Times {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
}