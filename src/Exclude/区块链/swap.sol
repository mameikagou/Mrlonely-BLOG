/*
swap函数：核心做市商兑换逻辑
-------------------------
1. 兑换的输入输出关系（定价公式）：
   amountOut = (reserveX * amountIn) / (reserveY + amountIn)
   体现了恒定乘积做市商的思想，输入一种代币，输出另一种代币，且输出数量与池子的储备量有关。

2. 兑换时储备量的更新：
   每次兑换后，池子的两种代币储备要及时更新，保证后续兑换的价格动态变化。

3. 代币的转账流程：
   用户先把代币转入合约，合约再把目标代币转给用户。

4. 安全性检查：
   require语句用于检查输入是否合法、输出数量是否大于0，防止异常操作。
*/
function swap(address _tokenIn, uint _amountIn) external returns (uint amountOut) {
    // 检查输入的token是否为池中两种代币之一
    require(
        _tokenIn == address(token0) || _tokenIn == address(token1),
        "invalid token" // 如果不是，则报错
    );

    // 读取当前储备量
    uint _reserve0 = reserve0;
    uint _reserve1 = reserve1;          

    if (_tokenIn == address(token0)) {
        // 如果输入的是 token0
        // 计算输出的 token1 数量
        amountOut = (_reserve1 * _amountIn) / (_reserve0 + _amountIn);

        // 检查输出数量是否大于 0
        require(amountOut > 0, "Insufficient output amount");

        // 用户将 token0 转入本合约
        token0.transferFrom(msg.sender, address(this), _amountIn);
        // 合约将计算出的 token1 转给用户
        token1.transfer(msg.sender, amountOut);

        // 更新储备量
        _update(_reserve0 + _amountIn, _reserve1 - amountOut);

    } else {
        // 如果输入的是 token1
        // 计算输出的 token0 数量
        amountOut = (_reserve0 * _amountIn) / (_reserve1 + _amountIn);
        
        // 检查输出数量是否大于 0
        require(amountOut > 0, "Insufficient output amount");

        // 用户将 token1 转入本合约
        token1.transferFrom(msg.sender, address(this), _amountIn);
        // 合约将 token0 转给用户
        token0.transfer(msg.sender, amountOut);

        // 更新储备量
        _update(_reserve0 - amountOut, _reserve1 + _amountIn);
    }
}