export interface Cliente {
    id_cliente: string;
    nombre_cliente: string;
    direccion_cliente: string ;
    barrio: string;
    descripcion: string;
    foto: string;
    telefono_cliente: number;
    nombre_productos: string;
    cantidad: number;
    valorUnidad: number;
    valorTotal: number;
    fecha: Date;
}

export interface Personal {
    id_cobrador: string;
    nombre_cobrador: string; 
    correo_cobrador: string;
    direccion_cobrador: string;
    telefono_cobrador: number;
    password: string;
}

export interface Administrador {
    id_admin: string;
    nombre_admin: string;
    correo_admin: string;
    password: string;
}

export interface Facturas {
    abono: number;
    restante: number;
    fecha_abono: Date;
    fecha_abono_próximo: string; //hay que buscar el tipo de dato adecuado
}

export interface Conteo {
    fecha_producto_salida: Date;
    cantidad_producto_salida: number;
    tipo_producto_salida: string; 
    fecha_producto_entrada: Date;
    cantidad_producto_entrada: number;
    tipo_producto_entrada: string; 
}

export interface Gastos {
    fecha_gastos: Date;
    gastos: number; 
    tipo_gasto: string;
    vales: number;
}