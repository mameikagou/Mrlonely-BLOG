写2D游戏编辑器的说是，666666

```ts
const map = Object.freeze({
    product: {} as Record<string, Reactive<any>>,
    review: {} as Record<string, Reactive<any>>,
    productCategory: {} as Record<string, Reactive<any>>,
});

type ModelNames = keyof typeof map;

type IStore<
    TModelName extends ModelNames,
    TMinimal extends { id: number },
    TFull extends TMinimal = TMinimal,
> = {
    get<TProps extends keyof Omit<TFull, keyof TMinimal> = never>(
        test: keyof Omit<TFull, keyof TMinimal>,
        key: TModelName,
        id: number | string,
        requiredProps?: TProps[],
    ):
        | (
            & TMinimal
            & Partial<Omit<TFull, TProps>>
            & Pick<TFull, TProps>
            & StoreMixins
        )
        | undefined;
    find<TProps extends keyof Omit<TFull, keyof TMinimal>>(
        key: TModelName,
        pred: (v: TMinimal & Partial<TFull>) => boolean,
        requiredProps?: TProps[],
    ):
        | (
            & TMinimal
            & Partial<Omit<TFull, TProps>>
            & Pick<TFull, TProps>
            & StoreMixins
        )
        | undefined;
    findMany<TProps extends keyof Omit<TFull, keyof TMinimal>>(
        key: TModelName,
        pred: (v: TMinimal & Partial<TFull>) => boolean,
        requiredProps?: TProps[],
    ):
        | (
            & TMinimal
            & Partial<Omit<TFull, TProps>>
            & Pick<TFull, TProps>
            & StoreMixins
        )[]
        | undefined;
    store<TActual extends TMinimal>(
        key: TModelName,
        model: TActual,
    ): TActual & Partial<TFull> & StoreMixins;
};

type ProductStore = IStore<"product", IProductBaseInfo, IProduct>;
type ReviewStore = IStore<"review", IReviewBase, IReview>;
type ProductCategoryStore = IStore<"productCategory", IProductCategory>;

type Store = ProductStore & ReviewStore & ProductCategoryStore;
```

这里的使用场景是做service的缓存层以及prisma那种orm，比如：

```ts
prisma.user.findUnique({ where: { id: 1 }, select: { email: true } });
```

一点一点读吧： 比如：

#### 输入值

```ts
get<TProps extends keyof Omit<TFull, keyof TMinimal> = never>
```

这里TMinimal = { id: number; name: string }

TFull = MinimalProduct & { description: string; price: number }

`keyof TMinimal = 'id' | 'name'`

`Omit<TFull, keyof TMinimal> = 'description' | 'price'`

`TProps extends keyof Omit<TFull, keyof TMinimal` 意味着这里只能取
`'description'`, `'price'` 和 `'description' | 'price'`

#### 返回值

`Partial<Omit<TFull, TProps>>` 传进来的props之外的东西都是可选
`Pick<TFull, TProps>` Props中的字段一定存在

`TMinimal & Partial<Omit<TFull, TProps>> & Pick<TFull, TProps> & StoreMixins)`
所以结果是：最小类型，TFull外面的其他都是可选，传进来的类型属于必须，传进来的类型属于必须
