import zod from 'zod';

const productoSchema = zod.object({
    nombre: zod.string().min(1).max(149),
    precio: zod.number().positive(),
    descripcion: zod.string().min(30).max(200),
    disponible: zod.union([
        zod.boolean(), zod.literal(0), zod.literal(1)]).transform((val) => {
            if (val === true) return 1;
            if (val === false) return 0;
            return val; // ya es 0 o 1
        }),
    fecha_ingreso: zod.iso.date(),
    categoriaId: zod.number().int().positive()   
})

export const validateProducto = ( data ) => {
    return productoSchema.safeParse( data );
}