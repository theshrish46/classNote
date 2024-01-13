import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod'

export const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
});

