import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import { useForm } from 'react-hook-form'
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from '@/schema/createCollection'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const onSubmit = (data: createCollectionSchemaType) => {
  console.log('SUBMITTED', data)
}

const CreateCollectionSheet = ({ open, onOpenChange }: Props) => {
  const form = useForm<createCollectionSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema),
  })
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>Collections</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription>Collection name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          'w-full h-8 text-white',
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button onClick={form.handleSubmit(onSubmit)}>Confirm</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CreateCollectionSheet
