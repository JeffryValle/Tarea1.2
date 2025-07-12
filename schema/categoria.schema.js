import zod from 'zod';

const categoriaSchema = zod.object({
    nombre: zod.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(150, 'El nombre no puede exceder los 150 caracteres'),
})

export const validateCategoria = ( categoria ) => {
    return categoriaSchema.safeParse( categoria );
}