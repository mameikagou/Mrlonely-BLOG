/**
 * addLiquidity函数：添加流动性
 * -------------------------------
 * 1. 首次添加流动性和后续添加的区别：
 *    首次添加时，流动性份额的计算方式和后续不同。首次用乘积，后续应按比例分配
 *    （采用min(_amount0 * totalLiquidity / _reserve0, _amount1 * totalLiquidity / _reserve1)的正确写法）。
 * 
 * 2. 添加流动性时，用户需要按当前池子的比例存入两种代币，否则会造成损失。
 * 
 * 3. 铸造流动性份额（mint）：
 *    用户添加流动性后，会获得代表池中份额的"流动性代币"。
 * 
 * 4. require安全性检查：
 *    检查输入数量是否合法，防止异常操作。
 */
function addLiquidity(uint _amount0, uint _amount1) external returns (uint liquidity) {
    // 检查输入数量是否合法
    require(_amount0 > 0 && _amount1 > 0, "Invalid amounts");
    
    // 读取当前token储备量
    uint _reserve0 = reserve0;
    uint _reserve1 = reserve1;
    
    // 用户将token转入合约
    token0.transferFrom(msg.sender, address(this), _amount0);
    token1.transferFrom(msg.sender, address(this), _amount1);
    
    if (totalLiquidity == 0) {
        // 如果是首次添加流动性
        liquidity = (_amount0 * _amount1) / 1e18; // 计算初始流动性份额
        require(liquidity > 0, "Invalid liquidity amount"); // 检查流动性份额是否合法
    } else {
        // 正确的流动性份额计算方式，按比例分配，取较小值
        uint liquidity0 = (_amount0 * totalLiquidity) / _reserve0;
        uint liquidity1 = (_amount1 * totalLiquidity) / _reserve1;
        liquidity = liquidity0 < liquidity1 ? liquidity0 : liquidity1; // 取较小值，防止池子比例失衡
        require(liquidity > 0, "Invalid liquidity amount"); // 检查流动性份额是否合法
    }
    
    _mint(msg.sender, liquidity); // 给用户铸造流动性份额
    _update(_reserve0 + _amount0, _reserve1 + _amount1); // 更新储备量
}
84%
④
固
②
囚
C
$
••